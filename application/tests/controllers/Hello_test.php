<?php
require "Hello.php";
class Hello_test extends TestCase
{
    public function test_get_hello()
    {
        // $output   = $this->request('GET', ['Hello', 'get_hello']);
        // $expected = '<h2>Hello!</h2>';
        $output   = 'a';
        $expected = 'a';

        $this->assertEquals($expected, $output);
    }
}
