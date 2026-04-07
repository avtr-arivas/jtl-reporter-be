const { PgLiteral } = require("node-pg-migrate")

exports.up = (pgm) => {
    pgm.createTable({ schema: "jtl", name: "chart_analysis" }, {
        id: {
            type: "serial",
            primaryKey: true,
        },
        item_id: {
            type: "uuid",
            notNull: true,
            references: { schema: "jtl", name: "items" },
            onDelete: "CASCADE",
        },
        chart_type: {
            type: "varchar(64)",
            notNull: true,
        },
        analysis: {
            type: "text",
            notNull: false,
            default: null,
        },
        generated: {
            type: "boolean",
            default: false,
            notNull: true,
        },
        created_at: {
            type: "timestamp with time zone",
            default: new PgLiteral("NOW()"),
            notNull: true,
        },
        updated_at: {
            type: "timestamp with time zone",
            default: new PgLiteral("NOW()"),
            notNull: true,
        },
    })

    pgm.addConstraint(
        { schema: "jtl", name: "chart_analysis" },
        "chart_analysis_item_id_chart_type_unique",
        { unique: ["item_id", "chart_type"] }
    )

    pgm.createIndex(
        { schema: "jtl", name: "chart_analysis" },
        "item_id",
        { name: "chart_analysis_item_id_idx" }
    )
}
