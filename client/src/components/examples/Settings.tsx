import Settings from '../../pages/Settings'
import { ThemeProvider } from '../ThemeProvider'

export default function SettingsExample() {
  return (
    <ThemeProvider>
      <Settings />
    </ThemeProvider>
  )
}
