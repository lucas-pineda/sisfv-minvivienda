import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Board, BoardsService } from '../../../../core/services/boards.service';

@Component({
  selector: 'app-board-viewer',
  templateUrl: './board-viewer.component.html',
  styleUrl: './board-viewer.component.scss'
})
export class BoardViewerComponent {
  board: Board | null = null;
  safeUrl: SafeResourceUrl | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly boardsService: BoardsService,
    private readonly sanitizer: DomSanitizer
  ) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.board = this.boardsService.getById(id);
    this.safeUrl = this.board ? this.sanitizer.bypassSecurityTrustResourceUrl(this.board.url) : null;
  }

  back(): void {
    this.router.navigate(['/dashboard/tablerostipo']);
  }

}
