<?php
    try{
        $dbh = new PDO('mysql:host=localhost;dbname=mike_ajax','root','');
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
    }catch(PDOException $e){
        echo 'Connexion impossible. Message error:'.$e;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
		if(!empty($_POST)){
			if(isset($_POST["id"])){			
				$stmt = $dbh->prepare("DELETE FROM `users` WHERE `id` = :id");
				$stmt->bindParam(':id', $_POST["id"]);
			}else{
				$stmt = $dbh->prepare("INSERT INTO `users`(`fistname`, `lastname`, `date_naiss`, `poste`) VALUES (:fistname, :lastname, :date_naiss, :poste)");
				$stmt->bindParam(':fistname', $_POST["firstname"]);
				$stmt->bindParam(':lastname', $_POST["lastname"]);
				$stmt->bindParam(':date_naiss', $_POST["datenaiss"]);
				$stmt->bindParam(':poste', $_POST["office"]);
			}
			$stmt->execute();
		}
    }elseif($_SERVER['REQUEST_METHOD'] == 'GET') {
		if(empty($_GET))
			$stmt = $dbh->prepare("SELECT * FROM `users`");
		else
			$stmt = $dbh->prepare("SELECT * FROM `users` WHERE id = ".$_GET['id']);
		
		$stmt->execute();
		// var_dump($stmt->fetchAll());
		echo json_encode($stmt->fetchAll());
	}