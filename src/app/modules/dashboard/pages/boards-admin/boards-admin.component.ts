import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Board, BoardsService } from '../../../../core/services/boards.service';

@Component({
  selector: 'app-boards-admin',
  templateUrl: './boards-admin.component.html',
  styleUrl: './boards-admin.component.scss'
})
export class BoardsAdminComponent {
  readonly boards$ = this.boardsService.boards$;

  editing: Board | null = null;

  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    url: ['', [Validators.required]],
    description: [''],
    icon: ['bi-grid'],
    showOnHome: [true]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly boardsService: BoardsService
  ) {}

  startCreate(): void {
    this.editing = null;
    this.form.reset({
      name: '',
      url: '',
      description: '',
      icon: 'bi-grid',
      showOnHome: true
    });
  }

  startEdit(board: Board): void {
    this.editing = board;
    this.form.reset({
      name: board.name,
      url: board.url,
      description: board.description ?? '',
      icon: board.icon ?? 'bi-grid',
      showOnHome: !!board.showOnHome
    });
  }

  cancel(): void {
    this.startCreate();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const payload = {
      name: value.name ?? '',
      url: value.url ?? '',
      description: value.description ?? '',
      icon: value.icon ?? undefined,
      showOnHome: !!value.showOnHome
    };

    if (this.editing) {
      this.boardsService.update(this.editing.id, payload);
    } else {
      this.boardsService.create(payload);
    }

    this.startCreate();
  }

  remove(board: Board): void {
    this.boardsService.remove(board.id);
    if (this.editing?.id === board.id) {
      this.startCreate();
    }
  }

  trackById(_: number, board: Board): string {
    return board.id;
  }
}
