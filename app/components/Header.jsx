import Link from "next/link"

const Header = () => {
    return (

        <div className="container flex mx-auto justify-between py-6">
            <div className="logo">
                <Link href='/' className='text-5xl '><span className='text-giga-green'>LFR</span> Heroes</Link>
            </div>
            <div className="flex space-x-4">
                <Link href='/about'>About</Link>
                <Link href='/profile'>Profile</Link>
                <Link href='/contact'>Contact</Link>
            </div>
        </div>
            
    )
}
export default Header