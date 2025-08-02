import ProfileCard from "../components/ProfileCard"
import SaldoCard from "../components/SaldoCard"
import Services from "../components/Services"
export default function Dashboard(){
    return(
        <>
            <div className="w-[80%] m-auto pt-5">
                <div className="flex items-center justify-between">
                    <ProfileCard/>
                    <SaldoCard/>
                </div>
                <Services/>
                <h2 className="font-semibold mt-10 mb-3">Temukan promo menarik</h2>
                <div className="flex gap-10 carousel rounded-box">
                    <div className="w-[200px] carousel-item">
                        <img src="/public/image/Banner 1.png" alt="" />
                    </div>
                    <div className="w-[200px] carousel-item">
                        <img src="/public/image/Banner 2.png" alt="" />
                    </div>
                    <div className="w-[200px] carousel-item">
                        <img src="/public/image/Banner 3.png" alt="" />
                    </div>
                    <div className="w-[200px] carousel-item">
                        <img src="/public/image/Banner 4.png" alt="" />
                    </div>
                    <div className="w-[200px] carousel-item">
                        <img src="/public/image/Banner 5.png" alt="" />
                    </div>
                </div>

            </div>
        </>
    )
}