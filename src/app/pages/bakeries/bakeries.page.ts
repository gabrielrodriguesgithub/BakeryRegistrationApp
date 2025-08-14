import { Component, OnInit } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Api} from '../../services/api';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-bakeries',
  templateUrl: './bakeries.page.html',
  styleUrls: ['./bakeries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BakeriesPage implements OnInit {

  bakeries: any[] = [];
  allBakeries: any[] = [];
  loading: boolean = true;
  error: string = '';
  userCoords: { lat: number, lng: number } | null = null;

  constructor(
    private api: Api,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBakeries();
  }

   ionViewWillEnter() {
    this.loadBakeries(); 
  }

  async getLocation() {
    try {
      const pos = await Geolocation.getCurrentPosition();
      this.userCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      this.loadBakeries();
    } catch (err) {
      console.warn('Não foi possível obter localização:', err);
    }
  }

  loadBakeries() {
  this.api.getBakeries().subscribe({
    next: (res: any) => {
      this.allBakeries = res;
      if (this.userCoords) {
        this.bakeries = res.map((b: any) => {
          if (b.latitude && b.longitude) {
            return {
              ...b,
              distance: this.getDistance(this.userCoords!.lat, this.userCoords!.lng, b.latitude, b.longitude)
            };
          }
          return { ...b, distance: Number.MAX_VALUE }; 
        });
        this.bakeries.sort((a, b) => a.distance - b.distance);
      } else {
        this.bakeries = res;
      }

      this.loading = false;
    },
    error: () => {
      this.error = 'Falha ao carregar padarias';
      this.loading = false;
    }
  });
  }
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; 
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  logout() {
    this.api.logout().subscribe({
      next: () => {
        localStorage.removeItem('token'); 
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

}
