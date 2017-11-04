Sub Multi_Year_Stock_Data()

    Dim Ticker_Name As String
    Dim Ticker_Total_Change As Double
    Dim Ticker_Percent_Change As Double
    Dim Ticker_Daily_Change As Double
    Dim Ticker_Total As Double
    

    

    
    Dim Summary_Table_Row As Integer
    Summary_Table_Row = 2
    
    
        For i = 2 To 636027
        
        If Cells(i + 1, 1).Value <> Cells(i, 1).Value Then
        
        Ticker_Name = Cells(i, 1).Value

        Ticker_Total_Change = Cells(i, 3).Value - Cells(i, 6).Value

        Ticker_Percent_Change = (Cells(i, 3).Value - Cells(i, 6).Value) / Cells(i, 3).Value
        
        Ticker_Daily_Change = (Cells(i, 6).Value - Cells(i, 3)) / (Cells(i, 6) + Cells(i, 3))

        Ticker_Total = Ticker_Total + Cells(i, 7).Value

        
        
        Range("I" & Summary_Table_Row).Value = Ticker_Name

        Range("J" & Summary_Table_Row).Value = Ticker_Total_Change

        Range("K" & Summary_Table_Row).Value = Ticker_Percent_Change

        Range("L" & Summary_Table_Row).Value = Ticker_Daily_Change
        
        Range("M" & Summary_Table_Row).Value = Ticker_Total
        
        Summary_Table_Row = Summary_Table_Row + 1
        
        Ticker_Total = 0

        
        Else
        
        Ticker_Total = Ticker_Total + Cells(i, 7).Value

        
        End If
        
        Next i
        
        
End Sub
