<?php
	//initialisation PDO pour accès BDD
	$pdo = new PDO(	'mysql:host=localhost;dbname=mike',
				'root',
				'',
				array(
					PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
					PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
					)
				);

	//traitement des données du form
	if(!(empty($_POST)))
	{
		$nom = addslashes(strip_tags($_POST['nom'])); //on récupère la valeur du titre dans la sperglobale $_POST "alimentée" plus tôt apres validation du formulaire
		$prenom = addslashes(strip_tags($_POST['prenom']));
		$dateNaissance = addslashes(strip_tags($_POST['dateNaissance']));
		$poste = addslashes(strip_tags($_POST['poste']));

		//// Insertion en BDD en preparer+bind+execute pour bloquer injection SQL
			// Prreparation requete
			$prepareReqInsert = $pdo->prepare("
				INSERT INTO users (last_name,first_name,poste,date_naissance,date_create)
				VALUES (:nom,:prenom,:poste,:dateDaissance,:dateCreation)
											");
			// Bind des valeurs avec des variables (d'où le bindParam)
			$prepareReqInsert->bindParam(':nom',$nom, PDO::PARAM_STR);
			$prepareReqInsert->bindParam(':prenom',$prenom, PDO::PARAM_STR);
			$prepareReqInsert->bindParam(':poste',$poste, PDO::PARAM_STR);
			$prepareReqInsert->bindParam(':dateDaissance',$dateNaissance, PDO::PARAM_STR);
			$prepareReqInsert->bindParam(':dateCreation', date('Y-m-d H:i:s'), PDO::PARAM_STR);	

			//Execution requete d'insetion en BDD
			$prepareReqInsert->execute();

			echo "<a href='index.html#mon_beau_form'>Back To form</a>";
	}
?>