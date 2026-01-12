package handler

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/monadnadnad/trapyojo-fan/backend/db"
)

type LikesResponse struct {
	DreamID string `json:"dreamId"`
	Count   int64  `json:"count"`
}

type LikeRequest struct {
	DreamID string `json:"dreamId"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")
	if origin != "" && !isAllowedOrigin(origin) {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}
	if origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Vary", "Origin")
	}
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	switch r.Method {
	case http.MethodGet:
		handleGet(w, r)
	case http.MethodPost:
		handlePost(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleGet(w http.ResponseWriter, r *http.Request) {
	dreamID := r.URL.Query().Get("dreamId")
	if dreamID == "" {
		http.Error(w, "Missing dreamId parameter", http.StatusBadRequest)
		return
	}
	if !isValidDreamID(dreamID) {
		http.Error(w, "Invalid dreamId", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	q, err := getQueries(ctx)
	if err != nil {
		log.Printf("db init error: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	count, err := q.GetLikesCount(ctx, dreamID)
	if err != nil {
		log.Printf("GetLikesCount error: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(LikesResponse{
		DreamID: dreamID,
		Count:   count,
	})
}

func handlePost(w http.ResponseWriter, r *http.Request) {
	var req LikeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}
	if req.DreamID == "" {
		http.Error(w, "Missing dreamId", http.StatusBadRequest)
		return
	}
	if !isValidDreamID(req.DreamID) {
		http.Error(w, "Invalid dreamId", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	q, err := getQueries(ctx)
	if err != nil {
		log.Printf("db init error: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	count, err := q.IncrementLikes(ctx, req.DreamID)
	if err != nil {
		log.Printf("IncrementLikes error: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(LikesResponse{
		DreamID: req.DreamID,
		Count:   count,
	})
}

var (
	poolMu sync.Mutex
	pool   *pgxpool.Pool
)

func getQueries(ctx context.Context) (*db.Queries, error) {
	// ウォームアップ時に複数のリクエストが同時に来てもプールが一度だけ初期化されるようにする
	if pool != nil {
		return db.New(pool), nil
	}

	poolMu.Lock()
	defer poolMu.Unlock()

	if pool != nil {
		return db.New(pool), nil
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		return nil, errors.New("DATABASE_URL environment variable is not set")
	}

	cfg, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		return nil, err
	}
	cfg.MaxConns = 4
	cfg.MinConns = 0
	cfg.MaxConnIdleTime = 30 * time.Second
	cfg.HealthCheckPeriod = 30 * time.Second

	p, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		return nil, err
	}

	if err := p.Ping(ctx); err != nil {
		p.Close()
		return nil, err
	}

	pool = p
	return db.New(pool), nil
}

func isAllowedOrigin(origin string) bool {
	switch origin {
	case "https://ty-fan.dev",
		"https://api.ty-fan.dev",
		"http://localhost:3000",
		"http://127.0.0.1:3000",
		"http://localhost:5173",
		"http://127.0.0.1:5173":
		return true
	default:
		return false
	}
}

func isValidDreamID(dreamID string) bool {
	if len(dreamID) > 36 {
		return false
	}
	return true
}
