// header.component.ts
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
//import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username!: string;

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    // Récupérer les informations de l'utilisateur depuis le service
    //const user: User = this.headerService.getUser();

    // Afficher le nom d'utilisateur
    this.username = "Ahmed" //user.name;
  }

  logout() {
    // Appeler la fonction de déconnexion du service
    //this.headerService.logout();
  }
}
