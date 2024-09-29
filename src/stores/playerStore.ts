import { computed, reactive, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import type { Player, PlayerID, PlayerOptions } from '@/types/Player'
import { usePieceStore } from '@/stores/pieceStore'
import type { GameMode } from '@/types/Game'
import { PIECE_COLOURS } from '@/config/constants/pieces'
import { is2PlayerGame } from '@/utilities/games'
import { useGameStore } from './gameStore'
import type { PieceID } from '@/types/Piece'

export const usePlayerStore = defineStore('playerStore', () => {
  // store dependencies
  const pieceStore = usePieceStore()
  const gameStore = useGameStore()

  // state
  const players: Record<PlayerID, Player> = reactive({})

  // getters
  const activePlayers: ComputedRef<Player[]> = computed(
    () => gameStore.currentGame?.playerIDs.map(p => players[p]) || []
  )

  const currentPlayer: ComputedRef<Player | null> = computed(() => {
    if (!gameStore.currentGame) return null
    else return players[gameStore.currentGame.currentPlayerID]
  })

  const firstPlayer: ComputedRef<Player | null> = computed(() => {
    if (!activePlayers.value?.length) return null
    else return activePlayers.value.find(p => p.playerNumber === 1) || null
  })

  const opponent: ComputedRef<Player | null> = computed(() => {
    const currentPlayerID = currentPlayer.value?.id
    if (!currentPlayerID || !activePlayers.value.length) return null
    else return activePlayers.value.find(p => p.id !== currentPlayerID) || null
  })

  const nextPlayer: ComputedRef<Player | null> = computed(() => {
    const currentPlayerNumber = currentPlayer.value?.playerNumber
    if (!activePlayers.value?.length || !currentPlayerNumber) return null
    else {
      const nextPlayerNumber = currentPlayerNumber + 1
      return activePlayers.value.find(p => p.playerNumber === nextPlayerNumber) || firstPlayer.value
    }
  })

  // methods
  const pieceBelongsToPlayer = (pieceID: PieceID, playerID: PlayerID): boolean => {
    const setID = players[playerID]?.set
    if (!setID) return false
    else return pieceStore.sets[setID]?.pieces?.includes(pieceID) || false
  }

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
          set: pieceStore.generateNewSetFromGameMode(mode, getPlayerColour(mode, i)),
        })
      )
    return newPlayers
  }

  // Return interface
  return {
    activePlayers,
    currentPlayer,
    generatePlayers,
    makeNewPlayer,
    nextPlayer,
    opponent,
    pieceBelongsToPlayer,
    players,
  }
})
