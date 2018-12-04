<?php
class Redis
{

    public function config()
    {
        $client = new Predis\Client([
            'scheme'   => 'tcp',
            'host'     => 'localhost',
            'port'     => 6379,
            'database' => 1,
        ]);
        return $client;
    }
}
