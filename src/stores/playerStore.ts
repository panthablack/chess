import { computed, reactive, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import type { Player, PlayerID, PlayerOptions } from '@/types/Player'
import { usePiecesStore } from './piecesStore'
import type { GameMode } from '@/types/Game'
import { PIECE_COLOURS } from '@/config/constants/pieces'
import { is2PlayerGame } from '@/utilities/games'
import { useGameStore } from './gameStore'

export const usePlayerStore = defineStore('playerStore', () => {
  // store dependencies
  const piecesStore = usePiecesStore()
  const gameStore = useGameStore()

  // state
  const players: Record<PlayerID, Player> = reactive({})

  // getters
  const getCurrentPlayers: ComputedRef<Player[]> = computed(
    () => gameStore.getCurrentGame?.players.map(p => players[p]) || []
  )

  // methods
  const getPlayerColour = (mode: GameMode, playerNumber: number) => {
    if (is2PlayerGame(mode) && playerNumber === 0) return PIECE_COLOURS.WHITE
    else if (is2PlayerGame(mode) && playerNumber === 1) return PIECE_COLOURS.BLACK
    else return PIECE_COLOURS.UNKNOWN
  }

  const makeNewPlayer = (options: PlayerOptions): PlayerID => {
    const player: Player = {
      ...options,
      // keep id last to prevent id being set manually
      id: getNextFreeNumericalKey(players),
    }
    players[player.id] = player
    return player.id
  }

  const generatePlayers = (mode: GameMode, numPlayers: number): PlayerID[] => {
    const newPlayers = []
    for (let i = 0; i < numPlayers; i++)
      newPlayers.push(
        makeNewPlayer({
          name: `Player ${i + 1}`,
          colour: getPlayerColour(mode, i),
          playerNumber: i + 1,
          set: piecesStore.generateNewSetFromGameMode(mode, getPlayerColour(mode, i)),
        })
      )
    return newPlayers
  }

  return { players, generatePlayers, getCurrentPlayers, makeNewPlayer }
})
