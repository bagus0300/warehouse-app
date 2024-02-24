module StockInoutsHelper
 def self.build_main_query(shipper_id, warehouse_id)
    sql = <<~SQL
      WITH inventory_summary AS (
        SELECT
          si.*,
          stocks.product_id,
          products.`name`,
          warehouse_fees.packaging
        FROM
          (
            SELECT
              inventory_in.lot_number,
              inventory_in.stock_id,
              (
                COALESCE ( inventory_in.in_amount, 0 ) - COALESCE ( inventory_out.out_amount, 0 )) AS inventory_stock 
            FROM
              (
                SELECT
                  lot_number,
                  stock_id,
                  SUM( amount ) AS in_amount
                FROM
                  stock_inouts
                  JOIN stocks ON stocks.id = stock_inouts.stock_id 
                WHERE
                  category = 0 #{filter_condition_for_shipper_and_warehouse(shipper_id, warehouse_id)}
                GROUP BY
                  lot_number,
                  stock_id 
              ) AS inventory_in
          LEFT JOIN (
            SELECT
              lot_number,
              stock_id,
              SUM( amount ) AS out_amount
            FROM
              stock_inouts
            WHERE
              category = 1
            GROUP BY
              stock_id,
              lot_number
          ) AS inventory_out ON inventory_out.stock_id = inventory_in.stock_id
                            AND inventory_out.lot_number = inventory_in.lot_number
          ) si
          JOIN stocks on stocks.id = si.stock_id
          JOIN products on products.id = stocks.product_id
          JOIN warehouse_fees ON warehouse_fees.id = products.warehouse_fee_id
      )
      SELECT t.*, inouton.inout_on
      FROM (
        SELECT * FROM inventory_summary
      ) t
      JOIN (
        SELECT inout_on, stock_id, lot_number FROM stock_inouts WHERE category = 0
      ) inouton ON inouton.stock_id = t.stock_id AND inouton.lot_number = t.lot_number
      ORDER BY t.stock_id, t.lot_number
    SQL
puts sql
     ActiveRecord::Base.connection.select_all(ActiveRecord::Base.send(:sanitize_sql_array, [sql, shipper_id, warehouse_id]))
  end

  private

  def self.filter_condition_for_shipper_and_warehouse(shipper_id, warehouse_id)
    "AND #{where_clause_for_shipper(shipper_id)} AND #{where_clause_for_warehouse(warehouse_id)}" unless shipper_id.blank? || warehouse_id.blank?
  rescue NameError
    ""
  end

  def self.where_clause_for_shipper(shipper_id)
    "stocks.shipper_id = ?"
  rescue NameError
    ""
  end

  def self.where_clause_for_warehouse(warehouse_id)
    "stocks.warehouse_id = ?"
  rescue NameError
    ""
  end
end
