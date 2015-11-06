<?php
//$arrObjects = json_decode($_POST['arrObjects']);
//$arrObjects = get_object_vars(json_decode(stripslashes($_POST['arrObjects'])));
$arrObjects = json_decode(file_get_contents('php://input'), true);
$to  = 'alpinistnew@yandex.ru';  // обратите внимание на запятую
//$to  = 'info@allawitte.nl';  // обратите внимание на запятую


// тема письма
$subject = htmlentities("Перезвонить клиенту", cp1251);

// текст письма


// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

// Дополнительные заголовки
//$headers .= 'To: Admin <lestnici.darin@gmail.com>' . "\r\n";

//$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
//$headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";
$message = '

				<html>
					<head>
						<title>'.$subject.'</title>
						
					</head>
					<body>
					<table>
						
'."\r\n";
foreach($arrObjects as $key => $value)
{
	$message .= '<tr><td>'.$value.'</td></tr>'."\r\n";
}
$message .= '</table>
			</body>
			</html>	
						
';
// Отправляем
mail($to, $subject, $message, $headers);