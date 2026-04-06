import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Board, BoardsService } from '../../../../core/services/boards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

/*     public reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=11e23b9b-d0b4-4670-b674-d3d08712fe5c&autoAuth=true&ctid=59f85572-2867-4480-b111-fc473309f9b3',
    tokenType: undefined,
    accessToken: undefined,
    settings: undefined,
  };
 */
  readonly boards$: Observable<Board[]> = this.boardsService.boards$.pipe(
    map(boards => boards.filter(b => !!b.showOnHome))
  );

  constructor(private readonly boardsService: BoardsService) {}
}
