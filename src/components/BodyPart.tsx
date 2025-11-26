import type { BodyPart } from "../types";
import { useMemo, useState } from "react";
import type { ReactElement } from "react";

const regionStroke = "stroke-border";
const regionBaseFill = "fill-muted";
const regionHoverFill = "fill-primary/30";
const regionActiveFill = "fill-primary/70";

type BodyMapProps = {
	selected: BodyPart | "";
	onSelect: (value: BodyPart) => void;
};

type Region = {
	id: BodyPart;
	label: string;
	tooltipPosition: { x: number; y: number };
	indicatorPositions: { x: number; y: number }[];
	renderShapes: (fillClass: string) => ReactElement;
};

const regions: Region[] = [
	{
		id: "Neck",
		label: "Neck",
		tooltipPosition: { x: 120, y: 88 },
		indicatorPositions: [{ x: 120, y: 96 }],
		renderShapes: (fillClass) => (
			<rect
				x={104}
				y={82}
				width={32}
				height={28}
				rx={10}
				className={`${regionStroke} ${fillClass}`}
			/>
		),
	},
	{
		id: "Shoulder",
		label: "Shoulder",
		tooltipPosition: { x: 120, y: 128 },
		indicatorPositions: [
			{ x: 84, y: 132 },
			{ x: 156, y: 132 },
		],
		renderShapes: (fillClass) => (
			<path
				d="M78 118c-6 10-6 22-6 36 0 11 10 20 22 20h52c12 0 22-9 22-20 0-14 0-26-6-36-7-12-19-18-42-18s-35 6-42 18z"
				className={`${regionStroke} ${fillClass}`}
			/>
		),
	},
	{
		id: "Elbow",
		label: "Elbow",
		tooltipPosition: { x: 120, y: 202 },
		indicatorPositions: [
			{ x: 64, y: 210 },
			{ x: 176, y: 210 },
		],
		renderShapes: (fillClass) => (
			<g className={`${regionStroke} ${fillClass}`}>
				<rect x={46} y={172} width={32} height={86} rx={16} />
				<rect x={162} y={172} width={32} height={86} rx={16} />
			</g>
		),
	},
	{
		id: "Back",
		label: "Back",
		tooltipPosition: { x: 120, y: 232 },
		indicatorPositions: [{ x: 120, y: 232 }],
		renderShapes: (fillClass) => (
			<path
				d="M94 148c-10 12-14 34-14 58 0 44 16 90 40 90s40-46 40-90c0-24-4-46-14-58-8-10-20-16-26-16s-18 6-26 16z"
				className={`${regionStroke} ${fillClass}`}
			/>
		),
	},
	{
		id: "Knee",
		label: "Knee",
		tooltipPosition: { x: 120, y: 310 },
		indicatorPositions: [
			{ x: 104, y: 314 },
			{ x: 136, y: 314 },
		],
		renderShapes: (fillClass) => (
			<g className={`${regionStroke} ${fillClass}`}>
				<rect x={96} y={288} width={22} height={52} rx={12} />
				<rect x={122} y={288} width={22} height={52} rx={12} />
			</g>
		),
	},
	{
		id: "Ankle/Foot",
		label: "Ankle / Foot",
		tooltipPosition: { x: 120, y: 378 },
		indicatorPositions: [
			{ x: 104, y: 376 },
			{ x: 136, y: 376 },
		],
		renderShapes: (fillClass) => (
			<g className={`${regionStroke} ${fillClass}`}>
				<rect x={96} y={352} width={22} height={54} rx={10} />
				<rect x={122} y={352} width={22} height={54} rx={10} />
				<rect x={92} y={396} width={26} height={18} rx={6} />
				<rect x={122} y={396} width={26} height={18} rx={6} />
			</g>
		),
	},
];

const BodyMap = ({ selected, onSelect }: BodyMapProps) => {
	const [hovered, setHovered] = useState<BodyPart | "">("");

	const getFillClass = (id: BodyPart) => {
		if (selected === id) return regionActiveFill;
		if (hovered === id) return regionHoverFill;
		return regionBaseFill;
	};

	const indicatorPulse = useMemo(
		() => "transition-all duration-200 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]",
		[]
	);

	const showTooltipFor = (id: BodyPart) => hovered === id || selected === id;

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-sm text-muted-foreground text-center">
				Hover or tap the circles to pick the area you want to focus on.
			</p>
			<div className="relative">
				<svg
					viewBox="0 0 240 460"
					className="w-full max-w-lg drop-shadow-sm"
					role="group"
					aria-label="Body map selection"
				>
					<defs>
						<linearGradient id="skinTone" x1="0" x2="0" y1="0" y2="1">
							<stop
								offset="0%"
								stopColor="hsl(var(--muted))"
								stopOpacity="0.6"
							/>
							<stop
								offset="100%"
								stopColor="hsl(var(--muted))"
								stopOpacity="0.8"
							/>
						</linearGradient>
					</defs>
					<g className="fill-[url(#skinTone)]">
						<circle cx={120} cy={54} r={30} />
						<rect x={106} y={76} width={28} height={30} rx={12} />
						<path d="M82 98c-6 10-10 26-10 46 0 26 6 52 14 72 10 24 16 36 16 58 0 24-10 48-10 70 0 12 4 20 10 24s16 6 18 6 12-2 18-6 10-12 10-24c0-22-10-46-10-70 0-22 6-34 16-58 8-20 14-46 14-72 0-20-4-36-10-46-10-14-24-22-48-22s-38 8-48 22z" />
						<path d="M64 136c-10 10-14 26-14 42 0 16 8 28 20 30l18 4c12 2 22-6 22-18 0-12-4-24-10-34-6-10-16-20-26-24-4-2-8-2-10 0z" />
						<path d="M176 136c10 10 14 26 14 42 0 16-8 28-20 30l-18 4c-12 2-22-6-22-18 0-12 4-24 10-34 6-10 16-20 26-24 4-2 8-2 10 0z" />
						<path d="M96 256c-8 16-12 32-12 48 0 22 6 42 12 56 6 16 18 26 24 26s18-10 24-26c6-14 12-34 12-56 0-16-4-32-12-48-8-18-26-24-36-24s-24 6-12 24z" />
					</g>

					{regions.map((region) => {
						const isActive = selected === region.id || hovered === region.id;

						return (
							<g
								key={region.id}
								role="button"
								tabIndex={0}
								aria-label={region.label}
								aria-pressed={selected === region.id}
								onMouseEnter={() => setHovered(region.id)}
								onMouseLeave={() => setHovered("")}
								onFocus={() => setHovered(region.id)}
								onBlur={() => setHovered("")}
								onClick={() => onSelect(region.id)}
								onKeyDown={(event) => {
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										onSelect(region.id);
									}
								}}
								className="cursor-pointer outline-none"
							>
								<title>{region.label}</title>
								<g className="transition-transform duration-150">
									{region.renderShapes(getFillClass(region.id))}
								</g>

								{region.indicatorPositions.map((pos, index) => (
									<g
										key={`${region.id}-${index}`}
										className={`transition-transform duration-200 ${
											isActive ? "scale-105" : "scale-100"
										}`}
									>
										<circle
											cx={pos.x}
											cy={pos.y}
											r={12}
											className={`${indicatorPulse} ${
												isActive
													? "fill-primary/80 stroke-primary"
													: "fill-background stroke-border"
											}`}
										/>
										<circle
											cx={pos.x}
											cy={pos.y}
											r={5}
											className={`${
												isActive
													? "fill-primary-foreground"
													: "fill-muted-foreground"
											}`}
										/>
									</g>
								))}

								<g
									className={`pointer-events-none transition-opacity duration-200 ${
										showTooltipFor(region.id) ? "opacity-100" : "opacity-0"
									}`}
								>
									<text
										x={region.tooltipPosition.x}
										y={region.tooltipPosition.y}
										textAnchor="middle"
										className="text-[12px] font-semibold fill-foreground drop-shadow-sm"
										paintOrder="stroke"
										stroke="hsl(var(--background))"
										strokeWidth={3}
										strokeLinecap="round"
									>
										{region.label}
									</text>
								</g>
							</g>
						);
					})}

					<ellipse
						cx={120}
						cy={446}
						rx={78}
						ry={14}
						className="fill-muted/70 blur-[3px]"
					/>
				</svg>
			</div>
		</div>
	);
};

export default BodyMap;
