<?php
class Hello extends CI_Controller
{
    public function get_hello()
    {
        $this->load->view('hello');
    }
}
