import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

type Props = {
  children: ReactNode
}

function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/")
      }
    })
  }, [navigate])

  return <>{children}</>
}

export default ProtectedRoute