<?php
defined('BASEPATH') or exit('No direct script access allowed');

/*
| ————————————————————————-
| Redis settings
| ————————————————————————-
| Your Redis servers can be specified below.
|
| See: http://codeigniter.com/user_guide/libraries/caching.html#redis
|
 */

$config['socket_type'] = 'tcp'; //`tcp` or `unix`
$config['socket']      = '/var/run/redis.sock'; // in case of `unix` socket type
$config['host']        = '127.0.0.1'; //change this to match your amazon redis cluster node endpoint
$config['password']    = null;
$config['port']        = 6379;
$config['timeout']     = 0;
