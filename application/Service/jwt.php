<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

class JWT
{
    /**
     * @method createJwtToken()
     * @var email string
     * This method creates the JWT token.
     * @return string
     */
    public function createJwtToken($email)
    {
        $header             = json_encode(['typ' => 'JWT', 'alg' => 'sha256']);
        $payload            = json_encode(['user_id' => $email]);
        $base64UrlHeader    = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload   = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        $signature          = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        $jwt                = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
        return $jwt;
    }
    /**
     * @method verify()
     * @var jwt string
     * This method verifies the JWT token is proper or not.
     * @return boolean
     */

    public function verify($jwt): bool
    {
        list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $jwt);

        $dataEncoded = "$headerEncoded.$payloadEncoded";

        $signature = JWT::base64UrlDecode($signatureEncoded);

        $rawSignature = hash_hmac('sha256', $dataEncoded, 'abC123!', true);

        return hash_equals($rawSignature, $signature);
    }
    public static function base64UrlDecode($data): string
    {
        $urlUnsafeData = strtr($data, '-_', '+/');

        $paddedData = str_pad($urlUnsafeData, strlen($data) % 4, '=', STR_PAD_RIGHT);

        return base64_decode($paddedData);
    }
}
