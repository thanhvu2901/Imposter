import { PLAYER_SPEED, SHIP_HEIGHT, SHIP_WIDTH } from "../consts/constants";
import { mapBounds } from "../../mapBounds";

const isWithinMovementBoundaries = (x, y) => {
  return !mapBounds[y] ? true : !mapBounds[y].includes(x);
};

export const movePlayer = (keys, player) => {
  const absPlayerX = player.x + SHIP_WIDTH / 2;
  const absPlayerY = player.y + SHIP_HEIGHT / 2 + 20;
  
  if (
    keys.includes('ArrowUp') &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY - PLAYER_SPEED)
  ) {
    player.y = player.y - 4;
  }
  if (
    keys.includes('ArrowDown') &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY + PLAYER_SPEED)
  ) {
    player.y = player.y + 4;
  }
  if (
    keys.includes('ArrowLeft') &&
    isWithinMovementBoundaries(absPlayerX - PLAYER_SPEED, absPlayerY)
  ) {
    player.x = player.x - 4;
    player.flipX = true;
  }
  if (
    keys.includes('ArrowRight') &&
    isWithinMovementBoundaries(absPlayerX + PLAYER_SPEED, absPlayerY)
  ) {
    player.x = player.x + 4;
    player.flipX = false;
  }
};
