
const NewsletterBox = () => {

    const onSubmitHandler = (e)=>{
        e.preventDefault()
    }


  return (
    <div className="text-center">
        <p className="text-gray-800 text-2xl font-medium">Subscribe now & get 30% off</p>

        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 outline-none" />
                <button className="bg-gray-800 text-white text-xs px-10 py-4">Subscribe</button>
        </form>

    </div>
  )
}

export default NewsletterBox