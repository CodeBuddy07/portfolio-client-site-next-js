import Title from "@/components/Shared/Title";
import Image from "next/image";


const Contact = () => {
    const data = {
        "email": "rjruhul05@gmail.com",
        "phone": "+8801737073172",
        "whatsApp": "+8801705684699",
    };

    return (
        <div id="contact" className="bg-[url('/5.jpg')] bg-cover bg-center bg-no-repeat w-full py-20 lg:px-32 xl:px-80 px-5">
            <Title title="CONTACT" />

            <div className="mt-20">
                <form className="flex flex-col gap-6">
                    {/* Name Input */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label className="w-24 text-gray-500 font-semibold text-lg md:text-right">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            className="w-full px-4 py-2 rounded outline-none backdrop-blur-md bg-black/30 text-gray-400 border border-gray-600 focus:border-red-600"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label className="w-24 text-gray-500 font-semibold text-lg md:text-right">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="user_email"
                            className="w-full px-4 py-2 rounded outline-none backdrop-blur-md bg-black/30 text-gray-400 border border-gray-600 focus:border-red-600"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col md:flex-row md:items-start gap-2">
                        <label className="w-24 text-gray-500 font-semibold text-lg md:text-right pt-2">
                            Message:
                        </label>
                        <textarea
                            name="message"
                            rows={6}
                            className="w-full px-4 py-2 rounded outline-none backdrop-blur-md bg-black/30 text-gray-400 border border-gray-600 focus:border-red-600"
                            placeholder="Write your message"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-gray-800 text-red-600 font-bold px-8 py-2 rounded-md transition-colors duration-300"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>

            {/* Contact Information */}
            <div className="flex flex-wrap justify-center gap-4 mt-16">
                {data?.email && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-gray-600">
                        <Image src="/email.png" alt="Email Icon" width={24} height={24} />
                        <span className="text-white text-sm">{data.email}</span>
                    </div>
                )}
                {data?.phone && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-gray-600">
                        <Image src="/phone.png" alt="Phone Icon" width={24} height={24} />
                        <span className="text-white text-sm">{data.phone}</span>
                    </div>
                )}
                {data?.whatsApp && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-gray-600">
                        <Image src="/whatsapp.png" alt="WhatsApp Icon" width={24} height={24} />
                        <span className="text-white text-sm">{data.whatsApp}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;
