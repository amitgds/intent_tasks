<?php

namespace Admin\NewCracker\Strategies;

use Admin\NewCracker\Core\Database;
use Admin\NewCracker\Core\Logger;
use Admin\NewCracker\Core\Config;

class HardCracker extends BaseCracker {
    private $dictionaryFile;

    public function __construct(Database $database, Logger $logger, Config $config) {
        parent::__construct($database, $logger, $config);
        $this->dictionaryFile = $config->get('DICTIONARY_FILE');
        if (!file_exists($this->dictionaryFile) || !is_readable($this->dictionaryFile)) {
            $this->logger->log("Dictionary file not found or not readable: {$this->dictionaryFile}");
            throw new \Exception("Dictionary file not found or not readable: {$this->dictionaryFile}");
        }
    }

    public function crack(): array {
        $this->logger->log("Starting hard (all passwords) cracking");
        $results = [];

        // 1. Crack 5-digit numbers (Easy)
        $numbers = CombinationGenerator::generateNumbers(5);
        foreach ($numbers as $number) {
            $hash = $this->hashPassword($number);
            $users = $this->database->query(
                "SELECT user_id FROM not_so_smart_users WHERE password = :hash",
                ['hash' => $hash]
            );
            foreach ($users as $user) {
                $results[$user['user_id']] = $number;
            }
        }

        // 2. Crack 3 uppercase letters + 1 number (Medium)
        $uppercaseCombinations = CombinationGenerator::generateUppercaseNumber();
        foreach ($uppercaseCombinations as $combo) {
            $hash = $this->hashPassword($combo);
            $users = $this->database->query(
                "SELECT user_id FROM not_so_smart_users WHERE password = :hash",
                ['hash' => $hash]
            );
            foreach ($users as $user) {
                $results[$user['user_id']] = $combo;
            }
        }

        // 3. Crack dictionary words (Medium)
        $words = file($this->dictionaryFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($words as $word) {
            $word = trim($word);
            if (strlen($word) <= 6 && ctype_lower($word)) {
                $hash = $this->hashPassword($word);
                $users = $this->database->query(
                    "SELECT user_id FROM not_so_smart_users WHERE password = :hash",
                    ['hash' => $hash]
                );
                foreach ($users as $user) {
                    $results[$user['user_id']] = $word;
                }
            }
        }

        // 4. Crack 6-character mixed case + number (Hard)
        $mixedCombinations = CombinationGenerator::generateMixedCaseNumber();
        foreach ($mixedCombinations as $combo) {
            $hash = $this->hashPassword($combo);
            $users = $this->database->query(
                "SELECT user_id FROM not_so_smart_users WHERE password = :hash",
                ['hash' => $hash]
            );
            foreach ($users as $user) {
                $results[$user['user_id']] = $combo;
            }
        }

        // 5. Explicitly test known Hard passwords
        $knownHardPasswords = ['AbC12z', 'XyZ89a'];
        foreach ($knownHardPasswords as $password) {
            $hash = $this->hashPassword($password);
            $users = $this->database->query(
                "SELECT user_id FROM not_so_smart_users WHERE password = :hash",
                ['hash' => $hash]
            );
            foreach ($users as $user) {
                $results[$user['user_id']] = $password;
            }
        }

        $this->logger->log("Hard cracking completed with " . count($results) . " results");
        return $results;
    }
}