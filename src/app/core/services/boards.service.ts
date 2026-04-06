import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Board {
  id: string;
  name: string;
  description?: string;
  url: string;
  icon?: string;
  showOnHome?: boolean;
  createdAt: number;
  updatedAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private readonly storageKey = 'pb_admin_boards';
  private readonly boardsSubject = new BehaviorSubject<Board[]>(this.loadInitial());
  readonly boards$ = this.boardsSubject.asObservable();

  getBoardsSnapshot(): Board[] {
    return this.boardsSubject.value;
  }

  getById(id: string): Board | null {
    const normalized = (id ?? '').trim();
    if (!normalized) {
      return null;
    }
    return this.boardsSubject.value.find(b => b.id === normalized) ?? null;
  }

  create(input: Pick<Board, 'name' | 'url'> & Partial<Pick<Board, 'description' | 'icon' | 'showOnHome'>>): Board {
    const now = Date.now();
    const board: Board = {
      id: this.createId(),
      name: (input.name ?? '').trim(),
      url: (input.url ?? '').trim(),
      description: (input.description ?? '').trim() || undefined,
      icon: (input.icon ?? '').trim() || undefined,
      showOnHome: !!input.showOnHome,
      createdAt: now,
      updatedAt: now
    };

    const next = [board, ...this.boardsSubject.value];
    this.persist(next);
    return board;
  }

  update(id: string, patch: Partial<Pick<Board, 'name' | 'url' | 'description' | 'icon' | 'showOnHome'>>): Board | null {
    const existing = this.getById(id);
    if (!existing) {
      return null;
    }

    const updated: Board = {
      ...existing,
      name: patch.name !== undefined ? patch.name.trim() : existing.name,
      url: patch.url !== undefined ? patch.url.trim() : existing.url,
      description: patch.description !== undefined ? (patch.description.trim() || undefined) : existing.description,
      icon: patch.icon !== undefined ? (patch.icon.trim() || undefined) : existing.icon,
      showOnHome: patch.showOnHome !== undefined ? !!patch.showOnHome : existing.showOnHome,
      updatedAt: Date.now()
    };

    const next = this.boardsSubject.value.map(b => (b.id === id ? updated : b));
    this.persist(next);
    return updated;
  }

  remove(id: string): boolean {
    const next = this.boardsSubject.value.filter(b => b.id !== id);
    if (next.length === this.boardsSubject.value.length) {
      return false;
    }
    this.persist(next);
    return true;
  }

  private persist(boards: Board[]): void {
    this.boardsSubject.next(boards);
    localStorage.setItem(this.storageKey, JSON.stringify(boards));
  }

  private loadInitial(): Board[] {
    const stored = this.loadFromStorage();
    if (stored.length > 0) {
      return stored;
    }

    const now = Date.now();
    const demoUrl = 'https://app.powerbi.com/view?r=eyJrIjoiNjQyM2Y5OTMtMWIxNi00ZjQxLWE4NzQtOTg3MzkzNTZmMzQxIiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9';

    const seed: Board[] = [
      {
        id: 'divis-dashboard-mejoramiento-vivienda',
        name: 'Dashboard de monitoreo y seguimiento programa de mejoramiento Programa Mejoramiento De Vivienda ',
        description: 'Programa Mejoramiento De Vivienda',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiZjVkYWMyYjMtZTU0Ni00NDMzLTgyMGQtMDM4MWYxNDM1OWYwIiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9',
        icon: 'bi-house',
        showOnHome: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'Subdirección de promoción y apoyo tablero programas de vivienda *',
        name: 'Subdirección de promoción y apoyo tablero programas de vivienda *',
        description: 'Seguimiento a Proyectos (Información Técnico) de los programas',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiYmE3MGU2ZDctMTMwMy00YTU1LThjYjMtZmNiYTdhYjQ5ODc0IiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9',
        icon: 'bi-house',
        showOnHome: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'Subdirección de promoción y apoyo plan rescate',
        name: 'Subdirección de promoción y apoyo plan rescate',
        description: 'Plan Rescate',
        url: 'https://nam10.safelinks.protection.outlook.com/?url=https%3A%2F%2Fapp.powerbi.com%2Fview%3Fr%3DeyJrIjoiYjM3YzQyYmMtYmU5Mi00NzM1LWE2NGItMmM5ZWQzMTRjMzYwIiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9&data=05%7C02%7CLPineda_AFD%40minvivienda.gov.co%7Cc0546ff47ab04e1aca7708de89be1759%7C59f8557228674480b111fc473309f9b3%7C0%7C0%7C639099646730127595%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=EsNcyJQ68ipgKgZHuhHGZaqM5Z%2B65%2Fo5ygIvF5PR%2F8c%3D&reserved=0',
        icon: 'bi-house',
        showOnHome: true,
        createdAt: now,
        updatedAt: now
      },      
      {
        id: 'tablero-control-programas-de-vivienda-spat',
        name: 'Tablero de control Programas de Vivienda- SPAT',
        description: 'Tablero de control Programas de Vivienda- SPAT',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiZjVkYWMyYjMtZTU0Ni00NDMzLTgyMGQtMDM4MWYxNDM1OWYwIiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9',
        icon: 'bi-house-heart',
        showOnHome: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'tablero-control-plan-rescate-spat',
        name: 'Tablero de control Plan Rescate- SPAT',
        description: 'Tablero de control Plan Rescate- SPAT',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiYjM3YzQyYmMtYmU5Mi00NzM1LWE2NGItMmM5ZWQzMTRjMzYwIiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9',
        icon: 'bi-people',
        showOnHome: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'visor-oferta-regional',
        name: 'Visores Estratégicos',
        description: 'Visor Oferta Regional',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiYjAwODRjZDktOTU4OS00OThmLTg2ZTctMDRkY2M3ZjA0MmY3IiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9',
        icon: 'bi-house-heart',
        showOnHome: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'visor-seguimiento-planeacion-estrategica',
        name: 'Seguimiento Planeación Estratégica',
        description: 'Seguimiento PAI',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiNjI1MjcwNTUtMjAxZS00MzM0LTlhOTYtNjRmN2Q5MTlhZWUwIiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9',
        icon: 'bi-people',
        showOnHome: true,
        createdAt: now,
        updatedAt: now
      },    
      {
        id: 'visor-vivienda-rural-nueva-para-la-planeacion-estrategica',
        name: 'Vivienda Rural Nueva para la Planeación estratégica',
        description: 'Ejecución Acumulada VISR Nuevas - Rural',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiNzE4NWE0MzgtMjM2ZC00MjY2LWIyM2QtZWZhMTdjODU5MjI0IiwidCI6IjU5Zjg1NTcyLTI4NjctNDQ4MC1iMTExLWZjNDczMzA5ZjliMyIsImMiOjR9',
        icon: 'bi-people',
        showOnHome: true,
        createdAt: now,
        updatedAt: now
      },        
    ];

    localStorage.setItem(this.storageKey, JSON.stringify(seed));
    return seed;
  }

  private loadFromStorage(): Board[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as Board[];
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter(b => !!b?.id && !!b?.name && !!b?.url);
    } catch {
      return [];
    }
  }

  private createId(): string {
    const base = Math.random().toString(36).slice(2, 10);
    return `board-${base}`;
  }
}
