<?php
 	/************************ Code de MIKE recopié ************************/
    try
    {
        $dbh = new PDO('mysql:host=localhost;dbname=mike','root','');
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
    }
    catch(PDOException $e)
    {
        echo 'Connexion impossible. Message error:'.$e;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST') //Si on a accédé à la page en POST
    {
		if(!empty($_POST)) //Si y'a qque chose dans POST
		{
			if(isset($_POST["id"])) //Si y'a id dans le POST, on prepare+bind une requete de delete sur l'id du POST
			{			
				$stmt = $dbh->prepare("DELETE FROM `users` WHERE `id` = :id");
				$stmt->bindParam(':id', $_POST["id"]);
			}
			else //Si y'a pas d'id dans le POST => on prepare+bind une requete d'insert avec toutes les data du POST
			{
				$stmt = $dbh->prepare("INSERT INTO `users`(`first_name`, `last_name`, `poste`, `date_naissance`,) VALUES (:fistname, :lastname, :poste, :date_naiss)");
				$stmt->bindParam(':fistname', $_POST["firstname"]);
				$stmt->bindParam(':lastname', $_POST["lastname"]);
				$stmt->bindParam(':date_naiss', $_POST["datenaiss"]);
				$stmt->bindParam(':poste', $_POST["office"]);
			}
			//Execution de la requete
			$stmt->execute();
		}
    }
    elseif($_SERVER['REQUEST_METHOD'] == 'GET') //Sinon, si on a accédé à la page en GET
    {
		if(empty($_GET)) //Si GET vide
			$stmt = $dbh->prepare("SELECT * FROM `users`"); //On prépare une requete d'affichage de tous les users
		else //On prépare une requete d'affichage du user d'id présent dans le GET
			$stmt = $dbh->prepare("SELECT * FROM `users` WHERE first_name = '".$_GET['id']."'");
		
		//Execution de la requete
		$stmt->execute();

		// On affiche le resultat de la requete
		// var_dump($stmt->fetchAll());
		echo json_encode($stmt->fetchAll());
	}
?>
