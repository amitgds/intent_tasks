<?php

namespace Admin\NewCracker\Core;

use PDO;
use PDOException;

class Database {
    private $pdo;
    private $logger;

    public function __construct(Config $config, Logger $logger) {
        $this->logger = $logger;
        try {
            $dsn = "mysql:host={$config->get('DB_HOST')};dbname={$config->get('DB_NAME')};charset=utf8mb4";
            $this->pdo = new PDO($dsn, $config->get('DB_USER'), $config->get('DB_PASS', ''), [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            $this->logger->log("Database connection established");
        } catch (PDOException $e) {
            $this->logger->log("Database connection failed: " . $e->getMessage());
            throw $e;
        }
    }

    public function query(string $sql, array $params = []): array {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}