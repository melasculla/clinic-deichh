export const useModalWindow = (stateKey?: string): { isOpen: Ref<boolean>, open: () => void, close: () => void } => {
   const isOpen = stateKey ? useState<boolean>(stateKey, () => false) : ref<boolean>(false)

   const keyCloseSelectWinwow = (e?: KeyboardEvent) => {
      if (!e?.key) {
         window.removeEventListener('keyup', keyCloseSelectWinwow)
         isOpen.value = false
         return
      }

      if (e.key !== 'Escape')
         return

      window.removeEventListener('keyup', keyCloseSelectWinwow)
      isOpen.value = false
   }

   const openModal = () => {
      window.addEventListener('keyup', keyCloseSelectWinwow)
      isOpen.value = true
   }

   return {
      isOpen,
      open: openModal,
      close: keyCloseSelectWinwow
   }
}