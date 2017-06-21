USE mike;

CREATE TABLE users (
  id INT(3) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  poste ENUM('CEO','SEO','SIO') NOT NULL,
  date_naissance DATE NOT NULL,
  date_create DATETIME NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB ;
 