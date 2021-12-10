import {Component, HostListener, OnInit} from '@angular/core';
import { Item } from "../../models/item";
import {GameService} from "../../services/game.service";

const colorMap: {[k: number]: string} = {
  2: '#E0654B',
  4: '#74E04B',
  8: '#4B8AE0',
  16: '#E09A4B',
  32: '#E04BDE',
  64: '#554E55',
  128: '#DC3C0C',
  256: '#E5DB4E',
  512: '#4EDBE5',
  1024: '#1682E1',
  2048: '#95E116',
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  keyEventCodeMap: {[type: string]: string} = {
    ArrowRight: 'right',
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowDown: 'down',
  }

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

  getStyles(item: Item): {[p: string]: string} {
    const top = (item.row * 110 - 100) + 'px';
    const left = (item.col * 110 - 100) + 'px';
    return {
      top,
      left,
      'background-color': colorMap[item.value] || 'black'
    };
  }

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    if (this.keyEventCodeMap[event.code]) {
      // @ts-ignore
      this.gameService[this.keyEventCodeMap[event.code]]();
    }

  }

}
