namespace PhotoStudio.Response;

public class TableDefinition<T> {
    public T[] Data { get; set; } = default!;
    public ColumnDefintion[] Columns { get; set; } = default!;
};
