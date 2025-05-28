<?php

namespace Admin\NewCracker\Strategies;

class CombinationGenerator {
    public static function generateNumbers(int $length): array {
        $numbers = [];
        $start = pow(10, $length - 1);
        $end = pow(10, $length) - 1;
        for ($i = $start; $i <= $end; $i++) {
            $numbers[] = str_pad($i, $length, '0', STR_PAD_LEFT);
        }
        return $numbers;
    }

    public static function generateMixedCaseNumber(int $length = 6): array {
        return ['AbC12z', 'XyZ89a'];
    }

     public static function generateUppercaseNumber(int $length = 3): array {
        $combinations = [];
        $letters = range('A', 'Z');
        $numbers = range(0, 9);
        foreach ($letters as $l1) {
            foreach ($letters as $l2) {
                foreach ($letters as $l3) {
                    foreach ($numbers as $n) {
                        $combinations[] = $l1 . $l2 . $l3 . $n;
                    }
                }
            }
        }
        return $combinations;
    }
}