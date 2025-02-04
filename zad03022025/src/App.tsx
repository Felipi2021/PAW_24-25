import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Posts} from "./components/posts";


const queryClient = new QueryClient()

function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <Posts></Posts>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </>
  )
}

export default App
