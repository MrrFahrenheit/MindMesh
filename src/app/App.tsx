import { Route, Routes } from "react-router-dom"
import Dashboard from "./home-page/Dashboard"
import HomePage from "./home-page/HomePage"
import Maps from "./home-page/Maps"
import Settings from "./home-page/Settings"
import Templates from "./home-page/Templates"
import { Providers } from "./Providers"
import UserLayout from "./UserLayout"
import WorkPage from "./work-page/WorkPage"
import WorkLayout from "./work-page/WorkLayout"
import { Toaster } from "react-hot-toast"
import { ProtectedRoute } from "../components/ProtectedRoute"

function App() {

  return (
    <>
      <Providers>
        <Toaster />
        <Routes>
          <Route element={<ProtectedRoute type="public" />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<ProtectedRoute type="private" />}>
            <Route path="/app/*" element={<UserLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="maps" element={<Maps />} />
            <Route path="templates" element={<Templates />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/minding/" element={<WorkLayout />}>
            <Route index element={<WorkPage />} />
          </Route>
          </Route>
        </Routes>
      </Providers>
    </>
  )
}

export default App
