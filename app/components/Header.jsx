import Link from "next/link";

const Header = () => {
	return (
		<div className='container flex mx-auto justify-between py-6'>
			<div className='logo'>
				<Link
					href='/'
					className='text-5xl '
				>
					<span className='text-giga-green'>LFR</span> Heroes
				</Link>
			</div>
			<button className='btn btn-primary'>Bnet Login</button>
		</div>
	);
};
export default Header;
