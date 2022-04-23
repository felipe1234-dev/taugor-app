export default function translateDate(dateStr: string): string {
    return (
        dateStr
            .replace("day", "dia")
            .replace("months", "meses")
            .replace("month", "mês")
            .replace("year", "ano")
            .replace("minute", "minuto")
            .replace("second", "segundo")
            .replace("hour", "hora")
            .replace("ago", "atrás")
            .replace(/^a\s/, "1 ")
            .replace(/^an\s/, "1 ")
            .replace("a few", "alguns")
            .replace("Jan", "janeiro")
            .replace("Feb", "fevereiro")
            .replace("Mar", "março")
            .replace("Apr", "abril")
            .replace("May", "maio")
            .replace("Jun", "junho")
            .replace("Jul", "julho")
            .replace("Aug", "Agosto")
            .replace("Sept", "setembro")
            .replace("Oct", "outubro")
            .replace("Nov", "novembro")
            .replace("Dec", "dezembro")
    );
}