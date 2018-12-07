<?php
include "/var/www/html/codeigniter/application/RabbitMQ/receive.php";
include "/var/www/html/codeigniter/application/RabbitMQ/receive.php";
require_once '/var/www/html/codeigniter/application/RabbitMQ/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class SendMail
{
    /**
     * @method sendEmail()
     * @var connection creates the AMPQSTREAMconnection
     * @return void
     */
    public function sendEmail($toEmail, $subject, $body)
    {
        /**
         * Establish the connection by giving servername,port,username,password.
         */
        $connection = new AMQPStreamConnection($this->RabbitMQConstantsRef->server, $this->RabbitMQConstantsRef->port, $this->RabbitMQConstantsRef->username, $this->RabbitMQConstantsRef->password);

        /**
         * Create channel forcommunication
         */
        $channel = $connection->channel();

        $channel->queue_declare($this->RabbitMQConstantsRef->quename, false, false, false, false);

        $data = json_encode(array(
            "from"       => $this->RabbitMQConstantsRef->fromName,
            "from_email" => $this->RabbitMQConstantsRef->Email,
            "to_email"   => $toEmail,
            "subject"    => $subject,
            "message"    => $body,
        ));

        $msg = new AMQPMessage($data, array('delivery_mode' => $this->RabbitMQConstantsRef->mode));

        $channel->basic_publish($msg, '', $this->RabbitMQConstantsRef->quename);

        $obj = new Receiver();
        /**
         * calling the receiver
         */
        $obj->receiverMail();

        $channel->close();

        $connection->close();
        return "Success";

    }
}
