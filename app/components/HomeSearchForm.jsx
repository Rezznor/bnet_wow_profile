"use client";

import { getCharacterStatus } from "../actions/HomeSearchFormAction";

const HomeSearchForm = ({ realmListData }) => {

    return (
        <form 
            action={getCharacterStatus}
            className="space-y-6"
        >
            <div>
                <label htmlFor="realm" className="block text-sm font-medium leading-6 text-white">
                    Realm
                </label>
                <div className="mt-2">
                    <select 
                        id="realm"
                        name="realm"
                        type="realm"
                        required
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        {realmListData.map((realm) => (
                            <option key={realm.id} value={realm.slug}>{realm.name}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="characterName" className="block text-sm font-medium leading-6 text-white">
                        Character Name
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        id="characterName"
                        name="characterName"
                        type="characterName"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Search
                </button>
            </div>
        </form>
    )
}
export default HomeSearchForm