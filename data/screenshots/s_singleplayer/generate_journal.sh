#!/bin/bash

SCREENSHOT_DIR="."
OUTPUT_FILE="$SCREENSHOT_DIR/journal.json"

echo "[" > "$OUTPUT_FILE"

files=($(ls *.png | sort))

declare -A dates

for f in "${files[@]}"; do
    base=$(basename "$f")
    date="${base:0:10}"

    if [[ -z "${dates[$date]}" ]]; then
        dates[$date]="$base"
    else
        dates[$date]="${dates[$date]},$base"
    fi
done

first=true
for date in $(printf "%s\n" "${!dates[@]}" | sort); do
    images="${dates[$date]}"
    IFS=',' read -ra arr <<< "$images"

    thumb="${arr[0]}"

    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> "$OUTPUT_FILE"
    fi

    echo "  {" >> "$OUTPUT_FILE"
    echo "    \"date\": \"$date\"," >> "$OUTPUT_FILE"
    echo "    \"thumb\": \"$thumb\"," >> "$OUTPUT_FILE"
    echo "    \"images\": [" >> "$OUTPUT_FILE"

    for i in "${!arr[@]}"; do
        comma=","
        if [ $i -eq $((${#arr[@]} - 1)) ]; then
            comma=""
        fi
        echo "      \"${arr[$i]}\"$comma" >> "$OUTPUT_FILE"
    done

    echo "    ]" >> "$OUTPUT_FILE"
    echo -n "  }" >> "$OUTPUT_FILE"
done

echo "" >> "$OUTPUT_FILE"
echo "]" >> "$OUTPUT_FILE"

echo "journal.json created at $OUTPUT_FILE"