// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/auth/services/authentification.service';
import { HeaderService } from '../../services/header.service';
//import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username!: string;

  constructor(private headerService: HeaderService,
              private authService: AuthentificationService,
              private route: Router) { }

  ngOnInit() {
    // Récupérer les informations de l'utilisateur depuis le service
    //const user: User = this.headerService.getUser();

    // Afficher le nom d'utilisateur
    this.username = "Ahmed" //user.name;
  }

  onLogOut(): void{
    this.authService.logout();
    this.route.navigateByUrl("/login");
    console.log('islogedout:', this.authService.isLoggedIn());
  }
}
