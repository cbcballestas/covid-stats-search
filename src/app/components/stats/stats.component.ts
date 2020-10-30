import { Component, Input } from '@angular/core';
import { Response } from '../../models/response';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  @Input() visible = false;
  @Input() data: Response;
}
