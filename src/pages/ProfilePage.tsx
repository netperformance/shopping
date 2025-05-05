import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

function ProfilePage() {
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    const { error } = await supabase.rpc("delete_user_and_data")
    if (error) {
      console.error("Fehler beim Löschen:", error.message)
      setIsDeleting(false)
      return
    }

    await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <div className="p-4">
      <p className="text-gray-500 text-sm">
        Drücke den Button unten, um dein Konto und alle deine Einkaufslisten vollständig aus dem System zu entfernen.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">
            Konto und alle meine Daten löschen
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bist du dir ganz sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Dein Konto und alle zugehörigen Daten werden dauerhaft gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ja, löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ProfilePage
