<?php
require 'JWT . php';
class implementationJWT
{
    private $key = "secret_key";
    public function GenerateToken($data)
    {
        $jwt = JWT::encode($data, $this . key);
    }
}
