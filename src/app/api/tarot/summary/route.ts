import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const dynamic = "force-dynamic";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

type TarotCardPayload = {
    index: number;
    position: string;
    positionDescription?: string;
    cardName: string;
    orientation: "Xuôi" | "Ngược";
    keywords?: string[] | string | null;
    uprightMeaning?: string | null;
    reversedMeaning?: string | null;
    selectedMeaning?: string | null;
    focusedMeaning?: string | null;
    loveMeaning?: string | null;
    careerMeaning?: string | null;
    moneyMeaning?: string | null;
    advice?: string | null;
};

export async function POST(req: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Chưa cấu hình GEMINI_API_KEY." },
                { status: 500 }
            );
        }

        const body = await req.json();

        const spreadTitle = body.spreadTitle || "Trải bài tự chọn";
        const spreadDescription = body.spreadDescription || "";
        const cards = body.cards as TarotCardPayload[];

        if (!cards || !Array.isArray(cards) || cards.length === 0) {
            return NextResponse.json(
                { error: "Thiếu dữ liệu lá bài." },
                { status: 400 }
            );
        }

        const prompt = `
Bạn là chuyên gia diễn giải Tarot cho website giải trí "Bói Vui Mỗi Ngày".

Bạn được phép sử dụng:
1. Dữ liệu lá bài do hệ thống cung cấp.
2. Kiến thức Tarot tổng quát mà bạn biết.
3. Khả năng tổng hợp, liên kết các lá bài thành một câu chuyện có chiều sâu.

Yêu cầu bắt buộc:
- Viết bằng tiếng Việt tự nhiên.
- Không mở đầu bằng câu chào như "Chào bạn".
- Không viết kiểu "lá bài Tarot đã mở ra...".
- Đi thẳng vào phần phân tích.
- Không liệt kê máy móc từng lá.
- Không chỉ lặp lại dữ liệu database.
- Phân tích mối liên hệ giữa các lá bài.
- Có thể bổ sung kiến thức Tarot phổ biến nếu phù hợp.
- Không khẳng định chắc chắn 100% tương lai.
- Không hù dọa, không phán xét.
- Không đưa lời khuyên y tế, pháp lý, tài chính như kết luận chắc chắn.
- Văn phong sâu sắc, chữa lành, gần gũi.
- Bắt buộc viết tối thiểu 2 đoạn.
- Tổng độ dài từ 180 đến 260 chữ.
- Không dùng markdown.
- Không dùng gạch đầu dòng.
- Không đặt tiêu đề phụ.
- Không được dừng giữa câu.
- Kết thúc bằng một câu lời khuyên hoàn chỉnh.

Kiểu trải bài:
${spreadTitle}

Mô tả kiểu trải:
${spreadDescription}

Dữ liệu các lá bài khách đã bốc:
${JSON.stringify(cards, null, 2)}

Hãy viết phần "Tổng kết trải bài của bạn".
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.75,
                maxOutputTokens: 3000,
            },
        });

        const summary = response.text?.trim() || "";

        console.log("Gemini finish reason:", response.candidates?.[0]?.finishReason);
        console.log("Gemini summary:", summary);

        if (summary.length < 300) {
            console.error("Gemini summary too short:", summary);

            return NextResponse.json({
                summary:
                    "Trải bài này cho thấy bạn đang ở một giai đoạn cần quan sát lại cảm xúc, lựa chọn và hướng đi của mình một cách bình tĩnh hơn. Những lá bài xuất hiện không nhằm đưa ra một kết luận tuyệt đối, mà giống như một lời nhắc để bạn nhìn rõ điều đang diễn ra bên trong cũng như hoàn cảnh xung quanh. Có thể bạn đang có những điểm mạnh sẵn có, nhưng vẫn cần thêm sự kiên nhẫn, tỉnh táo và chủ động để biến chúng thành hành động cụ thể. Hãy xem đây là thời điểm phù hợp để lắng nghe trực giác, điều chỉnh lại kỳ vọng và chọn bước đi khiến bạn cảm thấy vững vàng hơn.",
                fallback: true,
            });
        }

        return NextResponse.json({ summary });
    } catch (error) {
        console.error("Gemini tarot summary error:", error);

        return NextResponse.json(
            { error: "Không thể tạo tổng kết trải bài." },
            { status: 500 }
        );
    }
}