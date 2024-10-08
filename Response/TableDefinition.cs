namespace PhotoStudio.Response;

public class TableDefinition<T> {
    public T[] Data { get; set; } = default!;
    public ColumnDefinition[] Columns { get; set; } = default!;
};
