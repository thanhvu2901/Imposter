export const movePlayer = (keys, player) => {
    
    if (
      keys.includes('ArrowUp')
      
    ) {
      player.y = player.y - 2;
    }
    if (
      keys.includes('ArrowDown')
    ) {
      player.y = player.y + 2;
    }
    if (
      keys.includes('ArrowLeft')
    ) {
      player.x = player.x - 2;
      player.flipX = true;
    }
    if (
      keys.includes('ArrowRight') 
    ) {
      player.x = player.x + 2;
      player.flipX = false;
    }
  };