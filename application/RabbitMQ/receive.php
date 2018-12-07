<?php
require_once '/var/www/html/codeigniter/application/RabbitMQ/vendor/autoload.php';
include "/var/www/html/codeigniter/application/Static/RabbitMQConstants.php";
use PhpAmqpLib\Connection\AMQPStreamConnection;

class Receiver
{
    public $RabbitMQConstantsRef;
    public function __construct()
    {
        $this->RabbitMQConstantsRef = new RabbitMQConstants();
    }
    public function receiverMail()
    {
        $connection = new AMQPStreamConnection($this->RabbitMQConstantsRef->server, $this->RabbitMQConstantsRef->port, $this->RabbitMQConstantsRef->username, $this->RabbitMQConstantsRef->password);
        $channel    = $connection->channel();

        $channel->queue_declare($this->RabbitMQConstantsRef->quename, false, false, false, false);

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
            $transport = (new Swift_SmtpTransport($this->RabbitMQConstantsRef->smtp, $this->RabbitMQConstantsRef->smtpport, $this->RabbitMQConstantsRef->protocolName))
                ->setUsername($this->RabbitMQConstantsRef->email)
                ->setPassword($this->RabbitMQConstantsRef->Emailpassword);
            /**
             * Create the Mailer using your created Transport
             */
            $mailer = new Swift_Mailer($transport);

            /**
             * Create a message Swift messager
             */
            $message = (new Swift_Message($subject))
                ->setFrom([$data['from'] => $this->RabbitMQConstantsRef->userName])
                ->setTo([$to_email])
                ->setBody($message);
            /**
             * Send the message
             */
            $result = $mailer->send($message);

            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        };

        $channel->basic_consume($this->RabbitMQConstantsRef->quename, '', false, false, false, false, $callback);

        $channel->basic_qos(null, 1, null);

        while (count($channel->callbacks)) {
            $channel->wait();
        }
        $channel->basic_qos(null, 1, null);

    }
}
