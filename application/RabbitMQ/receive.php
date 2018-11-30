<?php
require_once '/var/www/html/codeigniter/application/RabbitMQ/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;

class Receiver
{
    public function receiverMail()
    {

        $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $channel    = $connection->channel();

        $channel->queue_declare('hello', false, false, false, false);

        $callback = function ($msg) {

            // echo " * Message received", "\n";
            $data = json_decode($msg->body, true);

            $from       = $data['from'];
            $from_email = $data['from_email'];
            $to_email   = $data['to_email'];
            $subject    = $data['subject'];
            $message    = $data['message'];

            /**
             * Create the Transport
             */
            $transport = (new Swift_SmtpTransport('smtp.gmail.com', 587, 'tls'))
                ->setUsername('scorpiansumukha@gmail.com')
                ->setPassword('nanukulla');
            /**
             * Create the Mailer using your created Transport
             */
            $mailer = new Swift_Mailer($transport);

            /**
             * Create a message
             */
            $message = (new Swift_Message($subject))
                ->setFrom([$data['from'] => 'Suman B S'])
                ->setTo([$to_email])
                ->setBody($message);
            /**
             * Send the message
             */
            $result = $mailer->send($message);

            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        };

        $channel->basic_consume('hello', '', false, false, false, false, $callback);

        $channel->basic_qos(null, 1, null);

    }
}
