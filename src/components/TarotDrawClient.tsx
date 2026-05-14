"use client";

import { useMemo, useState } from "react";
import styles from "./TarotDrawClient.module.css";

type TarotCard = {
    id: string;
    name: string;
    slug: string;
    arcana: string;
    suit: string | null;
    number_order: number | null;
    image_url: string;
    upright_keywords: string[] | null;
    reversed_keywords: string[] | null;
    upright_meaning: string | null;
    reversed_meaning: string | null;
    love_meaning: string | null;
    career_meaning: string | null;
    money_meaning: string | null;
    advice: string | null;
};

type DrawnCard = {
    card: TarotCard;
    orientation: "upright" | "reversed";
    deckIndex: number;
};

type SpreadPosition = {
    title: string;
    description: string;
};

type SpreadConfig = {
    title: string;
    description: string;
    positions: SpreadPosition[];
};

const CARD_BACK = "/images/tarot/extras.webp";
const DECK_SIZE = 30;

const SPREAD_CONFIGS: Record<number, SpreadConfig> = {
    1: {
        title: "Thông điệp hôm nay",
        description:
            "Một lá bài đại diện cho năng lượng, thông điệp hoặc lời nhắc quan trọng nhất dành cho bạn ở thời điểm hiện tại.",
        positions: [
            {
                title: "Thông điệp hôm nay",
                description: "Điều quan trọng nhất bạn nên chú ý trong hôm nay.",
            },
        ],
    },

    3: {
        title: "Quá khứ / Hiện tại / Tương lai",
        description:
            "Trải bài giúp bạn nhìn lại điều đã xảy ra, hiểu rõ hiện tại và tham khảo xu hướng sắp tới.",
        positions: [
            {
                title: "Quá khứ",
                description: "Điều đã ảnh hưởng đến tình huống hiện tại.",
            },
            {
                title: "Hiện tại",
                description: "Năng lượng, vấn đề hoặc cơ hội đang diễn ra.",
            },
            {
                title: "Tương lai",
                description:
                    "Xu hướng có thể xảy ra nếu mọi thứ tiếp tục như hiện tại.",
            },
        ],
    },

    5: {
        title: "Tổng quan 5 khía cạnh",
        description:
            "Trải bài giúp xem nhanh tình yêu, công việc, tài chính, điều cản trở và lời khuyên dành cho bạn.",
        positions: [
            {
                title: "Tình yêu",
                description: "Thông điệp về tình cảm, kết nối và các mối quan hệ.",
            },
            {
                title: "Công việc",
                description: "Thông điệp về học tập, công việc, sự nghiệp hoặc dự án.",
            },
            {
                title: "Tài chính",
                description:
                    "Thông điệp về tiền bạc, nguồn lực và cách quản lý vật chất.",
            },
            {
                title: "Cản trở",
                description: "Điều đang khiến bạn chậm lại hoặc dễ mắc kẹt.",
            },
            {
                title: "Lời khuyên",
                description: "Gợi ý tổng kết để bạn đi tiếp sáng suốt hơn.",
            },
        ],
    },

    8: {
        title: "Tổng quan cuộc sống",
        description:
            "Trải bài lớn giúp nhìn toàn cảnh năng lượng hiện tại, tình yêu, công việc, tài chính, cơ hội, thử thách và lời khuyên.",
        positions: [
            {
                title: "Năng lượng hiện tại",
                description: "Tổng quan trạng thái và tinh thần của bạn lúc này.",
            },
            {
                title: "Tình yêu",
                description: "Thông điệp về tình cảm và các mối quan hệ.",
            },
            {
                title: "Công việc",
                description:
                    "Thông điệp về công việc, học tập hoặc định hướng sự nghiệp.",
            },
            {
                title: "Tài chính",
                description: "Thông điệp về tiền bạc, nguồn lực và vật chất.",
            },
            {
                title: "Cơ hội",
                description: "Điều tích cực hoặc cánh cửa mới bạn nên chú ý.",
            },
            {
                title: "Thử thách",
                description: "Khó khăn, bài học hoặc điều cần vượt qua.",
            },
            {
                title: "Điều cần thay đổi",
                description:
                    "Thói quen, góc nhìn hoặc lựa chọn nên được điều chỉnh.",
            },
            {
                title: "Lời khuyên tổng kết",
                description: "Thông điệp cuối cùng giúp bạn đi tiếp rõ ràng hơn.",
            },
        ],
    },
};

const DEFAULT_SPREAD_CONFIG: SpreadConfig = {
    title: "Trải bài tự chọn",
    description:
        "Bạn có thể rút số lá tùy ý để nhận các thông điệp bổ sung cho tình huống hiện tại.",
    positions: [],
};

export default function TarotDrawClient({ cards }: { cards: TarotCard[] }) {
    const [drawCount, setDrawCount] = useState(1);
    const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
    const [selectedDeckIndexes, setSelectedDeckIndexes] = useState<number[]>([]);
    const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
    const [hasRevealed, setHasRevealed] = useState(false);

    const [aiSummary, setAiSummary] = useState("");
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);

    const activeCards = useMemo(() => {
        return cards.filter((card) => card.image_url);
    }, [cards]);

    const remainingToDraw = Math.max(drawCount - drawnCards.length, 0);
    const isComplete = drawnCards.length === drawCount;
    const spreadConfig = SPREAD_CONFIGS[drawCount] || DEFAULT_SPREAD_CONFIG;





    function changeDrawCount(count: number) {
        resetDraw(count);
    }

    function resetDraw(nextCount = drawCount) {
        setDrawCount(nextCount);
        setDrawnCards([]);
        setSelectedDeckIndexes([]);
        setAnimatingIndex(null);
        setHasRevealed(false);
        setAiSummary("");
        setIsSummaryLoading(false);
    }

    function revealCards() {
        if (!isComplete) return;

        setHasRevealed(true);
        generateAiSummary();
    }

    async function generateAiSummary() {
        try {
            setIsSummaryLoading(true);
            setAiSummary("");

            const payload = {
                spreadTitle: spreadConfig.title,
                spreadDescription: spreadConfig.description,
                cards: drawnCards.map((item, index) => {
                    const position = getSpreadPosition(index);

                    return {
                        index: index + 1,
                        position: position.title,
                        positionDescription: position.description,
                        cardName: item.card.name,
                        orientation: item.orientation === "upright" ? "Xuôi" : "Ngược",
                        keywords:
                            item.orientation === "upright"
                                ? item.card.upright_keywords
                                : item.card.reversed_keywords,
                        uprightMeaning: item.card.upright_meaning,
                        reversedMeaning: item.card.reversed_meaning,
                        selectedMeaning:
                            item.orientation === "upright"
                                ? item.card.upright_meaning
                                : item.card.reversed_meaning,
                        focusedMeaning: getFocusedMeaning(item, position.title),
                        loveMeaning: item.card.love_meaning,
                        careerMeaning: item.card.career_meaning,
                        moneyMeaning: item.card.money_meaning,
                        advice: item.card.advice,
                    };
                }),
            };

            const res = await fetch("/api/tarot/summary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("AI summary API error:", data);
                setAiSummary(buildSpreadSummary() || "");
                return;
            }

            if (data.summary) {
                setAiSummary(data.summary);
            } else {
                setAiSummary(buildSpreadSummary() || "");
            }
        } catch (error) {
            console.error("Generate AI summary error:", error);
            setAiSummary(buildSpreadSummary() || "");
        } finally {
            setIsSummaryLoading(false);
        }
    }

    function getSpreadPosition(index: number): SpreadPosition {
        return (
            spreadConfig.positions[index] || {
                title: `Lá ${index + 1}`,
                description: "Thông điệp bổ sung cho trải bài của bạn.",
            }
        );
    }

    function getBaseMeaning(item: DrawnCard) {
        return item.orientation === "upright"
            ? item.card.upright_meaning
            : item.card.reversed_meaning;
    }

    function getFocusedMeaning(item: DrawnCard, positionTitle: string) {
        const title = positionTitle.toLowerCase();

        if (title.includes("tình yêu") && item.card.love_meaning) {
            return item.card.love_meaning;
        }

        if (
            (title.includes("công việc") ||
                title.includes("sự nghiệp") ||
                title.includes("học tập")) &&
            item.card.career_meaning
        ) {
            return item.card.career_meaning;
        }

        if (
            (title.includes("tài chính") || title.includes("tiền bạc")) &&
            item.card.money_meaning
        ) {
            return item.card.money_meaning;
        }

        if (
            (title.includes("lời khuyên") ||
                title.includes("hướng đi") ||
                title.includes("hành động")) &&
            item.card.advice
        ) {
            return item.card.advice;
        }

        return getBaseMeaning(item);
    }

    function cleanText(text: string | null | undefined) {
        if (!text) return "";
        return text.replace(/\s+/g, " ").trim();
    }

    function shortenText(text: string, maxLength = 180) {
        if (text.length <= maxLength) return text;

        const sliced = text.slice(0, maxLength);
        const lastSpace = sliced.lastIndexOf(" ");

        if (lastSpace <= 0) return `${sliced}...`;

        return `${sliced.slice(0, lastSpace)}...`;
    }

    function buildSpreadSummary() {
        if (!hasRevealed || drawnCards.length === 0) return null;

        const summaryItems = drawnCards.map((item, index) => {
            const position = getSpreadPosition(index);
            const focusedMeaning = cleanText(getFocusedMeaning(item, position.title));
            const baseMeaning = cleanText(getBaseMeaning(item));
            const meaning = focusedMeaning || baseMeaning || "lá bài này đang gửi đến bạn một thông điệp cần được lắng nghe kỹ hơn";
            const orientationText =
                item.orientation === "upright" ? "xuôi" : "ngược";

            return {
                positionTitle: position.title,
                cardName: item.card.name,
                orientationText,
                meaning: shortenText(meaning, 170),
                advice: cleanText(item.card.advice),
            };
        });

        const cardNames = summaryItems
            .map((item) => `${item.cardName} ${item.orientationText}`)
            .join(", ");

        let opening = "";

        if (drawCount === 1) {
            opening =
                "Lá bài bạn rút cho thấy thông điệp nổi bật nhất ở thời điểm hiện tại.";
        } else if (drawCount === 3) {
            opening =
                "Trải bài của bạn đang mở ra một dòng chảy khá rõ giữa quá khứ, hiện tại và xu hướng sắp tới.";
        } else if (drawCount === 5) {
            opening =
                "Trải bài của bạn cho thấy nhiều khía cạnh quan trọng đang cùng tác động đến tình huống hiện tại.";
        } else if (drawCount === 8) {
            opening =
                "Trải bài tổng quan cho thấy bức tranh rộng hơn về năng lượng, cơ hội, thử thách và hướng đi của bạn trong giai đoạn này.";
        } else {
            opening =
                "Các lá bài bạn rút đang tạo thành một thông điệp tổng hợp về tình huống hiện tại.";
        }

        const body = summaryItems
            .map((item) => {
                return `Ở vị trí ${item.positionTitle}, lá ${item.cardName} ${item.orientationText} cho thấy ${item.meaning}`;
            })
            .join(" ");

        const finalAdvice =
            summaryItems
                .map((item) => item.advice)
                .filter(Boolean)
                .at(-1) ||
            "hãy lắng nghe trực giác, quan sát hoàn cảnh thực tế và chọn hướng đi giúp bạn cảm thấy vững vàng hơn.";

        return `${opening} Bộ bài nổi bật với ${cardNames}. ${body} Tổng kết lại, thông điệp dành cho bạn là: ${finalAdvice}`;
    }




    function pickCard(deckIndex: number) {
        if (activeCards.length === 0) return;
        if (isComplete) return;
        if (hasRevealed) return;
        if (selectedDeckIndexes.includes(deckIndex)) return;
        if (animatingIndex !== null) return;

        const alreadyDrawnIds = new Set(drawnCards.map((item) => item.card.id));

        const availableCards = activeCards.filter(
            (card) => !alreadyDrawnIds.has(card.id)
        );

        if (availableCards.length === 0) return;

        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const card = availableCards[randomIndex];

        const orientation: DrawnCard["orientation"] =
            Math.random() < 0.5 ? "upright" : "reversed";

        setAnimatingIndex(deckIndex);

        setTimeout(() => {
            setSelectedDeckIndexes((prev) => [...prev, deckIndex]);

            setDrawnCards((prev) => [
                ...prev,
                {
                    card,
                    orientation,
                    deckIndex,
                },
            ]);

            setAnimatingIndex(null);
        }, 280);
    }

    const spreadSummary = buildSpreadSummary();

    return (
        <main className="min-h-screen bg-[#10051f] px-4 py-8 text-white md:px-6 md:py-12">
            <section className={styles.tarotPage}>
                <div className="mb-8 text-center">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.32em] text-pink-300">
                        Rider–Waite Tarot
                    </p>

                    <h1 className="text-3xl font-black leading-tight md:text-5xl">
                        Rút bài Tarot
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60 md:text-base md:leading-7">
                        Chọn số lượng lá bài, sau đó chạm vào những lá bài úp bên dưới để
                        rút thông điệp dành cho bạn.
                    </p>
                </div>

                <div className={styles.optionPanel}>
                    <p className={styles.optionLabel}>Chọn Số Lượng Lá Bài Rút</p>

                    <div className={styles.spreadIntro}>
                        <h2>{spreadConfig.title}</h2>
                        <p>{spreadConfig.description}</p>
                    </div>

                    <div className={styles.countGrid}>
                        {Array.from({ length: 8 }, (_, index) => index + 1).map(
                            (count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => changeDrawCount(count)}
                                    className={`${styles.countBtn} ${drawCount === count ? styles.active : ""
                                        }`}
                                >
                                    <span>{count}</span>
                                </button>
                            )
                        )}
                    </div>

                    {spreadConfig.positions.length > 0 && (
                        <div className={styles.spreadPreview}>
                            {spreadConfig.positions.map((position, index) => (
                                <div
                                    key={`${position.title}-${index}`}
                                    className={styles.spreadPreviewCard}
                                >
                                    <div className={styles.spreadCardNumber}>
                                        Lá {index + 1}
                                    </div>

                                    <div>
                                        <h3>{position.title}</h3>
                                        <p>{position.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button type="button" className={styles.settingBtn}>
                        <span>☷</span>
                        Tùy Chọn Cài Đặt
                    </button>
                </div>

                <div className={styles.drawStatus}>
                    <div className={styles.statusPill}>
                        {isComplete
                            ? hasRevealed
                                ? `Đã lật ${drawCount} lá bài`
                                : `Đã chọn đủ ${drawCount} lá bài`
                            : `Vui lòng rút thêm ${remainingToDraw} lá bài`}
                    </div>

                    <button
                        type="button"
                        onClick={() => resetDraw()}
                        className={styles.resetBtn}
                        aria-label="Rút lại"
                    >
                        ↻
                    </button>

                    {isComplete && !hasRevealed && (
                        <button
                            type="button"
                            onClick={revealCards}
                            className={styles.revealBtn}
                        >
                            Lật bài
                        </button>
                    )}
                </div>

                <div className={styles.deckWrap}>
                    <div className={styles.deckRow}>
                        {Array.from({ length: DECK_SIZE }, (_, index) => {
                            const isSelected = selectedDeckIndexes.includes(index);
                            const isAnimating = animatingIndex === index;

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => pickCard(index)}
                                    disabled={isSelected || isComplete || hasRevealed}
                                    className={`${styles.deckCard} ${isSelected ? styles.selected : ""
                                        } ${isAnimating ? styles.animating : ""}`}
                                    aria-label={`Rút lá bài số ${index + 1}`}
                                >
                                    <img src={CARD_BACK} alt="Mặt sau lá bài Tarot" />

                                    {isSelected && (
                                        <span className={styles.deckCheck}>✓</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {drawnCards.length > 0 && (
                    <div className={styles.resultSection}>
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h2 className="text-xl font-black md:text-2xl">
                                {hasRevealed ? spreadConfig.title : "Kết quả rút bài"}
                            </h2>

                            <p className="text-sm font-semibold text-white/55">
                                {drawnCards.length}/{drawCount} lá
                            </p>
                        </div>

                        <div className={styles.resultGrid}>
                            {drawnCards.map((item, index) => {
                                const keywords =
                                    item.orientation === "upright"
                                        ? item.card.upright_keywords
                                        : item.card.reversed_keywords;

                                const position = getSpreadPosition(index);
                                const focusedMeaning = getFocusedMeaning(
                                    item,
                                    position.title
                                );

                                return (
                                    <article
                                        key={`${item.card.id}-${index}`}
                                        className={styles.resultCard}
                                    >
                                        <div className={styles.flipScene}>
                                            <div
                                                className={`${styles.flipCard} ${hasRevealed ? styles.revealed : ""
                                                    }`}
                                            >
                                                <div
                                                    className={`${styles.flipFace} ${styles.flipFront}`}
                                                >
                                                    <img
                                                        src={item.card.image_url}
                                                        alt={item.card.name}
                                                        className={`${styles.cardImg} ${item.orientation === "reversed"
                                                            ? styles.reversed
                                                            : ""
                                                            }`}
                                                    />
                                                </div>

                                                <div
                                                    className={`${styles.flipFace} ${styles.flipBack}`}
                                                >
                                                    <img
                                                        src={CARD_BACK}
                                                        alt="Mặt sau lá bài Tarot"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            {!hasRevealed ? (
                                                <div className="flex h-full min-h-[120px] flex-col justify-center">
                                                    <div className="mb-2 flex flex-wrap gap-2">
                                                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60 ring-1 ring-white/10">
                                                            {position.title}
                                                        </span>

                                                        <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-200 ring-1 ring-pink-300/20">
                                                            Đã chọn
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-black leading-tight text-white/85">
                                                        Lá bài đang úp
                                                    </h3>

                                                    <p className="mt-2 text-sm leading-6 text-white/55">
                                                        {position.description}
                                                    </p>

                                                    <p className="mt-1 text-sm leading-6 text-white/40">
                                                        Bấm “Lật bài” sau khi bạn đã chọn đủ số lá.
                                                    </p>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="mb-2 flex flex-wrap gap-2">
                                                        <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-200 ring-1 ring-pink-300/20">
                                                            {position.title}
                                                        </span>

                                                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60 ring-1 ring-white/10">
                                                            {item.orientation === "upright"
                                                                ? "Lá xuôi"
                                                                : "Lá ngược"}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-black leading-tight md:text-2xl">
                                                        {item.card.name}
                                                    </h3>

                                                    <p className="mt-2 text-sm leading-6 text-white/55">
                                                        {position.description}
                                                    </p>

                                                    {keywords && keywords.length > 0 && (
                                                        <div className={styles.keywordRow}>
                                                            {keywords.map((keyword) => (
                                                                <span
                                                                    key={keyword}
                                                                    className={styles.keyword}
                                                                >
                                                                    {keyword}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className={styles.meaningBox}>
                                                        <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-pink-200">
                                                            Ý nghĩa
                                                        </p>

                                                        <p className="text-sm leading-6 text-white/72">
                                                            {focusedMeaning ||
                                                                "Chưa có nội dung giải nghĩa."}
                                                        </p>
                                                    </div>

                                                    <div className="mt-3 grid gap-2 text-sm text-white/65">
                                                        <p>
                                                            <strong className="text-white">
                                                                Tình yêu:
                                                            </strong>{" "}
                                                            {item.card.love_meaning ||
                                                                "Đang cập nhật."}
                                                        </p>

                                                        <p>
                                                            <strong className="text-white">
                                                                Công việc:
                                                            </strong>{" "}
                                                            {item.card.career_meaning ||
                                                                "Đang cập nhật."}
                                                        </p>

                                                        <p>
                                                            <strong className="text-white">
                                                                Tài chính:
                                                            </strong>{" "}
                                                            {item.card.money_meaning ||
                                                                "Đang cập nhật."}
                                                        </p>

                                                        <p>
                                                            <strong className="text-white">
                                                                Lời khuyên:
                                                            </strong>{" "}
                                                            {item.card.advice || "Đang cập nhật."}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {hasRevealed && (
                            <div className={styles.spreadSummary}>
                                <p className={styles.spreadSummaryLabel}>
                                    Tổng kết trải bài của bạn:
                                </p>

                                {isSummaryLoading ? (
                                    <p>Đang phân tích năng lượng các lá bài...</p>
                                ) : (
                                    <p>{aiSummary || spreadSummary || "Chưa có tổng kết."}</p>
                                )}

                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}